import { useEffect, useState } from 'react';
import Style from './Tablepage.module.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid date
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    } catch (error) {
        return dateString;
    }
};
export function Tablepage({ searchTerm }) {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingCell, setEditingCell] = useState(null); // { rowIndex, fieldName }
    const [editValue, setEditValue] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });
    const itemsPerPage = 15;

    const showNotification = (message, type) => {
        setNotification({ message, type, visible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 5000);
    };

    const fetchTableData = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch("https://email-marketing-dashboard-v1.vercel.app/dashboard/orders", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data?.status_code === 200) {
                        setTableData(data.data || []);
                    }
                })
                .catch(error => console.error(error));
        }
    }

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleDoubleClick = (rowIndex, fieldName, currentValue) => {
        setEditingCell({ rowIndex, fieldName });
        setEditValue(currentValue || '');
    };

    const handleBlur = () => {
        saveChanges();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveChanges();
        } else if (e.key === 'Escape') {
            setEditingCell(null);
        }
    };

    const saveChanges = async () => {
        if (!editingCell) return;

        const { rowIndex, fieldName } = editingCell;
        const originalValue = tableData[rowIndex][fieldName];

        // Treat empty string as 0 for amount fields to avoid API errors
        const amountFields = ['writing_amount', 'modification_amount', 'po_amount'];
        let finalEditValue = editValue;

        if (amountFields.includes(fieldName) && (editValue === '' || editValue === null)) {
            finalEditValue = 0;
        }

        if (finalEditValue === originalValue) {
            setEditingCell(null);
            return;
        }

        // Optimistic update
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][fieldName] = finalEditValue;

        // Recalculate total_amount if any sub-amount was changed
        let payload = { [fieldName]: finalEditValue };

        if (amountFields.includes(fieldName)) {
            const row = updatedTableData[rowIndex];
            const writing = parseFloat(row.writing_amount) || 0;
            const modification = parseFloat(row.modification_amount) || 0;
            const po = parseFloat(row.po_amount) || 0;
            const newTotal = writing + modification + po;

            updatedTableData[rowIndex].total_amount = newTotal;
            payload.total_amount = newTotal;
        }

        setTableData(updatedTableData);
        setEditingCell(null);

        // API Call to update backend
        const token = localStorage.getItem('token');
        const rowToUpdate = updatedTableData[rowIndex];

        try {
            const response = await fetch(`https://email-marketing-dashboard-v1.vercel.app/dashboard/orders/${rowToUpdate.order_db_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            console.log(rowToUpdate.order_db_id);
            console.log(payload);
            const result = await response.json();
            if (response.ok) {
                console.log('Update successful:', result);
                showNotification("Dashboard order updated successfully", "success");
            } else {
                console.error('Update failed:', result);
                showNotification("Failed to update dashboard order", "error");
                // Revert changes
                fetchTableData();
            }
        } catch (error) {
            console.error('Error updating backend:', error);
            showNotification("Error connecting to server", "error");
            fetchTableData();
        }
    };

    // Filter data based on search term
    const filteredData = tableData.filter(row => {
        if (!searchTerm) return true;
        return Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset pagination when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Fields that should never be editable inline
    const READ_ONLY_FIELDS = new Set(['total_amount']);

    const renderCell = (row, rowIndex, fieldName, displayValue) => {
        // Read-only: just show the value, no double-click editing
        if (READ_ONLY_FIELDS.has(fieldName)) {
            return (
                <td key={fieldName} style={{ cursor: 'default', userSelect: 'text' }} title="Read-only field">
                    {displayValue ?? row[fieldName] ?? 'N/A'}
                </td>
            );
        }

        const isEditing = editingCell && editingCell.rowIndex === rowIndex && editingCell.fieldName === fieldName;
        const dateFields = [
            'order_date', 'writing_start_date', 'writing_end_date', 'modification_start_date',
            'modification_end_date', 'po_start_date', 'po_end_date', 'phase_1_payment_date',
            'phase_2_payment_date', 'phase_3_payment_date'
        ];

        const dropdownFields = {
            payment_status: ['paid', 'pending', 'partial'],
            index: ['SCI', 'Scopus', 'SSCI', 'EI', 'Scopus & SCI', 'SCIE'],
            rank: ['Q1', 'Q2', 'Q3', 'Q4', 'Anything', 'Q1 or Q2', 'Q2 or Q3', 'Q3 or Q4'],
            order_type: ['WO/PO', 'MO/PO', 'WO', 'PO', 'MO/RV', 'MO', 'Thesis writing', 'WO/Implementation/PO', 'Review paper writing', 'WO/Conference', 'Improvement'],
            currency: ['USD', 'INR', 'CHINA']
        };

        const textareaFields = ['title', 'remarks', 'client_affiliations'];

        return (
            <td onDoubleClick={() => handleDoubleClick(rowIndex, fieldName, row[fieldName])}>
                {isEditing ? (
                    dateFields.includes(fieldName) ? (
                        <DatePicker
                            selected={editValue && !isNaN(new Date(editValue).getTime()) ? new Date(editValue) : null}
                            onChange={(date) => {
                                if (date) {
                                    setEditValue(date.toISOString());
                                }
                            }}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className={Style.editInput}
                        />
                    ) : dropdownFields[fieldName] ? (
                        <select
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className={Style.editInput}
                        >
                            <option value="" disabled>Select option</option>
                            {dropdownFields[fieldName].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : textareaFields.includes(fieldName) ? (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    saveChanges();
                                } else if (e.key === 'Escape') {
                                    setEditingCell(null);
                                }
                            }}
                            autoFocus
                            className={Style.editInput}
                            style={{ resize: 'vertical', minHeight: '80px', width: '250px', whiteSpace: 'pre-wrap', textAlign: 'left' }}
                        />
                    ) : (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className={Style.editInput}
                        />
                    )
                ) : textareaFields.includes(fieldName) ? (
                    <div className={Style.scrollableCellContent}>
                        {displayValue || row[fieldName] || 'N/A'}
                    </div>
                ) : (
                    displayValue || row[fieldName] || 'N/A'
                )}
            </td>
        );
    };

    return (
        <div className={Style.page}>
            {notification.visible && (
                <div className={`${Style.notification} ${Style[notification.type]}`}>
                    <div className={Style.notificationIcon}>
                        {notification.type === 'success' ? '✓' : '✕'}
                    </div>
                    <p>{notification.message}</p>
                </div>
            )}
            <div className={Style.tablecontainer}>
                {/* table header */}
                <div className={Style.tableheader}>
                    <h2>Overall Table</h2>
                    <p>displaying <span>{currentData.length}</span> of {filteredData.length} records</p>
                    <button className={Style.exportBtn}>Export</button>
                </div>
                {/* table data */}
                <div className={Style.tablecontainerdata}>

                    <table className={Style.tabledata}>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>client Id</th>
                                <th>Country</th>
                                <th>client Email</th>
                                <th>whatsapp no</th>
                                <th>order date</th>
                                <th>order type</th>
                                <th>client ref id</th>
                                <th>manuscript id</th>
                                <th>Title</th>
                                <th>index</th>
                                <th>rank</th>
                                <th>currency</th>
                                <th>total amount</th>
                                <th>writing amount</th>
                                <th>modification amount</th>
                                <th>po amount</th>
                                <th>writing start date</th>
                                <th>writing end date</th>
                                <th>modification start date</th>
                                <th>modification end date</th>
                                <th>po start date</th>
                                <th>po end date</th>
                                <th>phase 1 payment</th>
                                <th>phase 1 payment date</th>
                                <th>phase 2 payment</th>
                                <th>phase 2 payment date</th>
                                <th>phase 3 payment</th>
                                <th>phase 3 payment date</th>
                                <th>Total Paid Amount</th>
                                <th>payment status</th>
                                <th>bank account</th>
                                <th>client affiliations</th>
                                <th>remarks</th>
                                
                                <th>Client Drive</th>
                                <th>Client Details</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((row, index) => {
                                // Find actual index in tableData for editing
                                const actualIndex = tableData.findIndex(item => item === row);
                                return (
                                    <tr key={startIndex + index}>

                                        <td>{startIndex + index + 1}</td>
                                        {renderCell(row, actualIndex, 'client_id')}
                                        {renderCell(row, actualIndex, 'client_country', row.client_country)}
                                        {renderCell(row, actualIndex, 'client_Email')}
                                        {renderCell(row, actualIndex, 'client_whatsapp_number')}
                                        {renderCell(row, actualIndex, 'order_date', formatDate(row.order_date))}
                                        {renderCell(row, actualIndex, 'order_type')}
                                        {renderCell(row, actualIndex, 'ref_no')}
                                        {renderCell(row, actualIndex, 'manuscript_id')}
                                        {renderCell(row, actualIndex, 'title')}
                                        {renderCell(row, actualIndex, 'index')}
                                        {renderCell(row, actualIndex, 'rank')}
                                        {renderCell(row, actualIndex, 'currency')}
                                        {renderCell(row, actualIndex, 'total_amount')}
                                        {renderCell(row, actualIndex, 'writing_amount')}
                                        {renderCell(row, actualIndex, 'modification_amount')}
                                        {renderCell(row, actualIndex, 'po_amount')}
                                        {renderCell(row, actualIndex, 'writing_start_date', formatDate(row.writing_start_date))}
                                        {renderCell(row, actualIndex, 'writing_end_date', formatDate(row.writing_end_date))}
                                        {renderCell(row, actualIndex, 'modification_start_date', formatDate(row.modification_start_date))}
                                        {renderCell(row, actualIndex, 'modification_end_date', formatDate(row.modification_end_date))}
                                        {renderCell(row, actualIndex, 'po_start_date', formatDate(row.po_start_date))}
                                        {renderCell(row, actualIndex, 'po_end_date', formatDate(row.po_end_date))}
                                        {renderCell(row, actualIndex, 'phase_1_payment')}
                                        {renderCell(row, actualIndex, 'phase_1_payment_date', formatDate(row.phase_1_payment_date))}
                                        {renderCell(row, actualIndex, 'phase_2_payment', row.phase_2_payment)}
                                        {renderCell(row, actualIndex, 'phase_2_payment_date', formatDate(row.phase_2_payment_date))}
                                        {renderCell(row, actualIndex, 'phase_3_payment', row.phase_3_payment)}
                                        {renderCell(row, actualIndex, 'phase_3_payment_date', formatDate(row.phase_3_payment_date))}
                                        <td>{(parseFloat(row.phase_1_payment) || 0) + (parseFloat(row.phase_2_payment) || 0) + (parseFloat(row.phase_3_payment) || 0)}</td>
                                        {renderCell(row, actualIndex, 'payment_status')}
                                        {renderCell(row, actualIndex, 'bank_account')}
                                        {renderCell(row, actualIndex, 'client_affiliations')}
                                        {renderCell(row, actualIndex, 'remarks')}
                                        <td>
                                            {row.client_drive_link ? (
                                                <a href={row.client_drive_link} target="_blank" rel="noopener noreferrer" className={Style.viewLink}>view</a>
                                            ) : ''}
                                        </td>
                                        <td>
                                            {row.client_details ? (
                                                <a href={row.client_details} target="_blank" rel="noopener noreferrer" className={Style.viewLink}>view</a>
                                            ) : ''}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>

                <div className={Style.tablefooter}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <h3>Page {currentPage} of {totalPages}</h3>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}

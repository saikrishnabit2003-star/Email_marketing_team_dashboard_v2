import Style from './Maindashboard.module.css';
import Icon from '../assets/Icon.png'
import Profile from '../assets/Profile2.png'
export function Maindashboard(){
    
    return(
        <div className={Style.mainDashboard}>
            <div className={Style.dashboardnav}>
                <div id={Style.searchbar}>
                    <h1></h1>
                    <input type="search" placeholder="Search..." />
                </div>
                <div id={Style.userprofile}>
                    <div id={Style.userinfodiv}>
                        <h2>Username</h2>
                        <p>role</p>
                    </div>
                    
                    <div id={Style.userprofileimg}>
                        <img src={Profile} alt="" />
                    </div>
                </div>
            </div>

            <div className={Style.dashboardcontent}>
                {/* Dashboard Header */}
                <div className={Style.dashboardheader}>
                    <div>
                        <p>Arrow Thought</p>
                        <h1>overall Dashboard</h1>
                    </div>
                    <div id={Style.dashboardheaderbtn}>
                        <button>📂 filter</button>
                        <button>⬇ Export</button>
                    </div>
                </div>

                {/* Dashboard Analytics */}
                <div className={Style.dashboardanalytics}>
                    <div className={Style.analyticscard}>
                        <div id={Style.analyticsicon}>
                            {/* <img src="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" alt="" /> */}
                        <img src={Icon} alt="" />  
                        </div>
                        <div>
                            <p>total amount</p>
                            <h1>~ 000000</h1>
                        </div>
                    </div>
                    <div className={Style.analyticscard}>
                        <div id={Style.analyticsicon}>
<img src={Icon} alt="" />                        </div>
                        <div>
                            <p>Profit</p>
                            <h1>~ 000000</h1>
                        </div>
                    </div>
                    <div className={Style.analyticscard}>
                        <div id={Style.analyticsicon}>
<img src={Icon} alt="" />                        </div>
                        <div>
                            <p>Loss</p>
                            <h1>~ 000000</h1>
                        </div>
                    </div>
                    <div className={Style.analyticscard}>
                        <div id={Style.analyticsicon}>
<img src={Icon} alt="" />                        </div>
                        <div>
                            <p>Percentage</p>
                            <h1>~ 00.00%</h1>
                        </div>
                    </div>
                    

                </div>

                {/* Dashboard Table */}
                <div className={Style.tablecontainer}>
                    {/* table header */}
                    <div className={Style.tableheader}>
                        <h2>Dashboard Table</h2>
                        <p>displaying total <span>0000</span> records</p>
                    </div>
                    {/* table data */}
                    <div className={Style.tablecontainerdata}>
                        
                            <table className={Style.tabledata}>
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Column1</th>
                                        <th>Column2</th>
                                        <th>Column3</th>
                                        <th>Column4</th>
                                        <th>Column5</th>
                                        <th>Column6</th>
                                        <th>Column7</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                        <th>Columns</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr><tr>
                                        <td>1</td>
                                        <td>Data1</td>
                                        <td>Data2</td>
                                        <td>Data3</td>
                                        <td>Data4</td>
                                        <td>Data5</td>
                                        <td>Data6</td>
                                        <td>Data7</td>
                                        <td>Data8</td>
                                        <td>Data9</td>
                                        <td>Data10</td>
                                        <td>Data11</td>
                                        <td>Data12</td>
                                        <td>Data13</td>
                                        <td>Data14</td>
                                        <td>Data15</td>
                                        <td>Data16</td>
                                        <td>Data17</td>
                                        <td>Data18</td>
                                        <td>Data19</td>
                                        <td>Data20</td>
                                        <td>Data21</td>
                                        <td>Data22</td>
                                        <td>Data23</td>
                                        <td>Data24</td>
                                        <td>Data25</td>
                                        <td>Data26</td>
                                        <td>Data27</td>
                                        <td>Data28</td>
                                        <td>Data29</td>
                                        <td>Data30</td>
                                        <td>Data31</td>
                                        <td>Data32</td>
                                    </tr>
                                </tbody>

                            </table>
                    </div>

                    <div className={Style.tablefooter}>
                        <button>Previous</button>
                        <h3>Page 1 of 5</h3>
                        <button>Next</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
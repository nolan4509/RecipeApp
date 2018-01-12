import React, { Component } from 'react';
import './App.css';
import ReactTooltip from 'react-tooltip';

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {course: ''}
    }
    sellerHubClick = () => { // My Books
        this.props.history.push("/sellerHub")
    }
    courseHubClick = () => { // Search Courses
        this.props.history.push("/courseHub")
    }
    handleChange(event) {
        this.setState({course: event.target.value})
    }
    render() {
        return (
            <div>
                {/* Home */}
                <meta charSet="utf-8"/>
                <title>Home</title>
                <header>
                    <h1 className="big">Home</h1>
                    <div>
                        <button id="myBooksButton" onClick={this.sellerHubClick}
                                data-tip data-for='myBooksTip'>
                            My Books
                        </button>
                        <ReactTooltip id='myBooksTip' aria-haspopup='true' border={true} effect='solid' place='bottom'>
                            <font size='3'> This will bring you to your page where you can see all of the current books
                                you are trying to sell.</font><br/><br/> 
                            <font size='3'> From here, you can update, remove, or add a new book post to sell.</font>
                        </ReactTooltip>
                        <button id="searchCoursesButton" onClick={this.courseHubClick}
                        data-tip data-for='searchCoursesTip'>
                            Search Courses
                        </button>
                        <ReactTooltip id='searchCoursesTip' aria-haspopup='true' border={true} effect='solid' place='right'>
                            <font size='3'> This will bring you to the course hub page, where you can search for whatever course
                                you need books for.</font><br/><br/>
                            <font size='3'> Once you click search, you will see all available books for that course. Then just find the
                                book you need and click on the email seller button next to it.</font>
                        </ReactTooltip>
                    </div>
                </header>
                <br/>
                { /*doesnt work like it should, but not needed, on hold for now
                    <div id="searchForCourseForm">
                    <form action="/courseHub" method="get">
                        {/* <h1>Search For Course:</h1> }
                        <label htmlFor="courseSearch">Search For Course:</label> <br/>
                        <input pattern="[A-Z]{1,4}+[0-9]{3,4}]" id="courseSearch" type="text" placeholder="ex. 'CS100'"
                               value={this.state.course} onChange={this.handleChange.bind(this)}/>
                    </form>
                </div>*/}
                <br/>
            
            </div>

        );
    }
}

export default Home;
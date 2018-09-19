import React, {Component} from 'react';
import './NewRecipe.css';

/*  From Textbook App
postBook = () => {
    this.preventDefault()
    this.target.reset()
    this.setState({
        complete: false
    })
    console.log('courseCode = ' + this.state.courseCode)
    console.log('courseLevel = ' + this.state.courseLevel)
    console.log('course = ' + this.state.course)
    fetch(`/user/${this.state.userID}/books/newBook/${this.state.isbn}/${this.state.condition}/${this.state.teacher}/${this.state.courseCode}/${this.state.course.substr(-3)}/${this.state.price}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(this.setState({
        submissionStatus: `Post successfully created`
    }))
        .catch((ex) => {
        console.log('parsing failed', ex)
    })
    this.props.history.push("/sellerHub")
}
*/

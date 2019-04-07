import React from 'react';

export default class Help extends React.Component {
  render() {
    return (<div>
        <p>This is a test to collect the effectiveness of a graphical password scheme.</p>
        <p> <b>1.</b> In the first section you will generate and practice memorizing your password </p>
        <p> <b>2. </b>In the second section you will be testing how well you can recall those passwords </p>
        <p> Keep in mind that the order for testing is not neccessarily the same order as the password creation process </p>
        <p> So note what each password is for </p>
        <p> <b>3. </b> Finally click end test when you are finished your test so that your testing data will be submitted </p>
        <br/>
        <p> <b> Note: </b> All information that we are tracking is contained at the bottom under the Logs heading with the addition
                            that we are also storing the password itself, as well as what you typed when attempting the password</p>
                            <p> We store: </p>
                              <ul>
                                <li>Date</li>
                                <li>userid</li>
                                <li>service (Banking, email, shopping)</li>
                                <li>password</li>
                                <li>password attempted</li>
                                <li>number of attempts</li>
                                <li>mode (creation, testing)</li>
                                <li>time it takes to submit password</li>
                              </ul>
        <button onClick = {this.props.handleClose}>Close </button>
        </div>)
  }
}

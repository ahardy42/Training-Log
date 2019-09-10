import React from 'react';
import DatePicker from 'react-datepicker';

class PickerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null
        }
    }
    handlePickerChange = (date) => {
        this.setState({
            date: date
        }, () => {
            this.props.handleChange(this.state.date, this.props.validationFunction);
        });
    }
    componentDidMount() {
        if (this.props.currValue) {
            this.setState({
                date: new Date(this.props.currValue)
            });
        }
    }
    render() {
        return (
            <div className="form-group">
                <DatePicker
                    onChange={this.handlePickerChange}
                    placeholderText="Select a Date!"
                    selected={this.state.date}
                    disabledKeyboardNavigation={true}
                />
            </div>
        );
    }
}

export default PickerWrapper;
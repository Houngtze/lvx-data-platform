/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react'
import { DatePicker, Text } from 'antd-mobile';
import moment from "moment"

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: props.conditionData && new Date(props.conditionData.dateCondition.dateList.slice(-1)[0]),
      dpValue: null,
      customChildValue: null,
      visible: false,
      minDate: props.conditionData && props.conditionData.dateCondition.minDate,
      maxDate: props.conditionData && props.conditionData.dateCondition.maxDate
    };
  }

  onChange=(val) => {
    this.setState({
      date: new Date(val)
    })
    this.props.getDate(val)
  }

  getShowDate = (value) => {
    let dateValue = moment(value).format("YYYY-MM-DD");
    let tem = (
        <Text style={{fontSize:18}}>{dateValue}</Text>
    )
    return tem;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      minDate: nextProps.conditionData.dateCondition.minDate,
      maxDate: nextProps.conditionData.dateCondition.maxDate,
    })
  }

  render() {
    const { date, minDate, maxDate } = this.state
    return (<div className="date-picker">
       <DatePicker
          value={date}
          mode="date"
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
          onChange={this.onChange}
          format={(value) =>{
              return this.getShowDate(value);
          }}
      >
          <div className="picker-content">
            <span>{this.getShowDate(this.state.date)}</span>
            <img src={require('../../../images/icon-filter.png')} alt='filter'/>
          </div>
      </DatePicker>
    </div>);
  }
}


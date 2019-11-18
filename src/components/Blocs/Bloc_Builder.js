import React from 'react';

class BlocBuilder extends React.Component {
  // -1 waiting 
  // 0 active
  // 1 done

  constructor(props) {
    super(props);
    this.state = {
      //snapshot represents the object data that would be sent to the builder
      snapshot: {
        data: null,
        connectionState: -1,
        error: null,
      }
    }
    this.subscription = null;
  }

  componentDidMount() {
    this.subscription = this.props.subject.subscribe(
      (data) => {
        this.setState({
          snapshot: {
            data: data,
            connectionState: 0,
            error: null,
          }
        })
      },
      (error) => {
        this.setState({
          snapshot: {
            data: null,
            connectionState: 1,
            error: error
          }
        })
      },
      () => {
        this.setState({
          snapshot: {
            data: null,
            connectionState: 1,
            error: null,
          }
        })
      }
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return(
      this.props.builder(this.state.snapshot)
    );
  }
}

export default BlocBuilder;
import React, { Component } from 'react';

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const url = 'https://script.google.com/macros/s/AKfycbwSwDNaxqi4tceblgQebjLFLyR2LzMc_6xjpPR9d0A2mtxG08nylJqbZHzxRmYAWAwb/exec';
    const apiUrls = [url + '?action=getRoutes', url + '?action=getStations'];

    Promise.all(apiUrls.map((url) => fetch(url).then((response) => response.json())))
      .then((responses) => {
        const [data1, data2] = responses;
        this.setState({ data: { data1, data2 }, loading: false });
        this.props.onDataFetched(data1, data2); // Gọi hàm onDataFetched và truyền dữ liệu
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
      return <p>Lỗi: {error.message}</p>;
    }

    return null;
  }
}

export default DataFetcher;
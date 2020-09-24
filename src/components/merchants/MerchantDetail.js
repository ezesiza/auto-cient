import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOneMerchant } from "../../actions/merchantActions";
import { Link } from "react-router-dom";

class MerchantDetail extends Component {
  state = {
    bid: [],
    merchant: {},
    pageSizeOptions: [5, 10, 15, 20],
    currentPage: 1,
    merchantsPerPage: 4,
    totalPages: 0,
  };

  handleClick = this.handleClick.bind(this);
  changePageSize = this.changePageSize.bind(this);

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  changePageSize(e) {
    this.setState({
      merchantsPerPage: e.target.value,
      currentPage: 1,
    });
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getOneMerchant(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.merchant.merchant) {
      const merchant = nextProps.merchant.merchant;
    this.setState({
        bid: [...merchant.bid],
        merchant,
      });
    }
  }
  render() {
    const { bid, merchantsPerPage, currentPage } = this.state;

    const indexOfLastRepo = currentPage * merchantsPerPage;
    const indexOfFirstRepo = indexOfLastRepo - merchantsPerPage;
    const currentRepos = bid.slice(indexOfFirstRepo, indexOfLastRepo);
    let bidsData;
    if (this.state.bid.length > 0) {
      bidsData = currentRepos.map((item) => {
        return (
          <tbody key={item.id}>
            <tr>
              <td>{item.id}</td>
              <td>{item.cartitle}</td>
              <td>{item.created}</td>
              <td>{item.amount}</td>
            </tr>
          </tbody>
        );
      });
    }
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bid.length / merchantsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li className="page-item" key={number} id={number}>
          <a
            key={number}
            id={number}
            className={`page-link active
                    ${
                      number === this.state.currentPage
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
            onClick={this.handleClick}
          >
            {number}
          </a>
        </li>
      );
    });

    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <Link to="/" className="btn btn-light">
            Go Back to Merchant List
          </Link>
          <hr />
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              {" "}
              List of {bid.length} bid(s) belonging to
              <h1 className="display-4">
                {this.state.merchant.lastname} {this.state.merchant.firstname}
                <p className="lead"></p>
              </h1>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Car Title</th>
                <th scope="col">Created</th>
                <th scope="col">Amount ($)</th>
              </tr>
            </thead>
            {bidsData}
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">{renderPageNumbers}</ul>
          </nav>
        </div>
      </section>
    );
  }
}

MerchantDetail.propTypes = {
  merchant: PropTypes.object.isRequired,
  getOneMerchant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  merchant: state.merchant,
});

export default connect(mapStateToProps, { getOneMerchant })(MerchantDetail);

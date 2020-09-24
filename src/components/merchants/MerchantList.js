import React, { Component } from "react";
import PropTypes from "prop-types";

import { getMerchants, deleteMerchant } from "../../actions/merchantActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MerchantList extends Component {
  state = {
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

  componentDidMount() {
    this.props.getMerchants();
  }

  onDeleteClick(id) {
    this.props.deleteMerchant(id);
  }

  render() {
    const { merchants, loading } = this.props.merchants;
    const { merchantsPerPage, currentPage } = this.state;

    const indexOfLastRepo = currentPage * merchantsPerPage;
    const indexOfFirstRepo = indexOfLastRepo - merchantsPerPage;
    const currentRepos = merchants.slice(indexOfFirstRepo, indexOfLastRepo);

    let merchantList;

    if (merchants.length < 1 || loading) {
      merchantList = <h1>...Merchants Loading</h1>;
    } else {
      if (Object.keys(currentRepos)) {
        merchantList = currentRepos.map((item) => (
          <div className="col-md-6 col-lg-4" key={item.id}>
            <div className="card shadow-sm border-light mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <Link className="page-link" to={`/merchant/${item.id}`}>
                    {item.firstname}
                  </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {item.lastname}
                </h6>
                <p className="card-text">{item.lastname}</p>
                <button
                  onClick={this.onDeleteClick.bind(this, item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <Link
                  to={`/update-merchant/${item.id}`}
                  className="btn btn-primary"
                >
                  Edit Merchant
                </Link>
              </div>
            </div>
          </div>
        ));
      }
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(merchants.length / merchantsPerPage); i++) {
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
          <Link to="/add-merchant" className="btn btn-light">
            <button type="button" className="btn btn-primary">
              Add Merchant
            </button>
          </Link>
          <hr />
          <div className="row mb-md-2">{merchantList}</div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">{renderPageNumbers}</ul>
          </nav>
        </div>
      </section>
    );
  }
}

MerchantList.propTypes = {
  getMerchants: PropTypes.func.isRequired,
  deleteMerchant: PropTypes.func.isRequired,
  merchants: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  merchants: state.merchant,
});

export default connect(mapStateToProps, { getMerchants, deleteMerchant })(
  MerchantList
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { addMerchant } from "../../actions/merchantActions";
import PropTypes from "prop-types";
import InputData from "./InputData";
import { Link } from "react-router-dom";

class CreateMerchant extends Component {
  state = {
    firstname: "",
    lastname: "",
    avatarUrl: "",
    email: "",
    phone: "",
    haspremium: "",
    bid: "",
  };

  onChange = this.onChange.bind(this);
  onSubmit = this.onSubmit.bind(this);

  onSubmit(e) {
    e.preventDefault();
    const merchantData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      avatarUrl: this.state.avatarUrl,
      email: this.state.email,
      phone: this.state.phone,
      haspremium: this.state.haspremium,
      bidId: this.state.bidId,
    };
    this.props.addMerchant(merchantData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <div className="create-merchant">
        <Link to="/" className="btn btn-light">
          Go Back to Merchant List
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Merchant Profile</h1>
              <p className="lead text-center">
                Use inputs below to create a Merchant
              </p>
              <small className="d-block pb-3">*=required field</small>
              <form onSubmit={this.onSubmit}>
                <InputData
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
                <InputData
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                />
                <InputData
                  placeholder="Avatar Url"
                  name="avatarUrl"
                  value={this.state.avatarUrl}
                  onChange={this.onChange}
                />
                <InputData
                  placeholder="E-Mail"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <InputData
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                <InputData
                  placeholder="Has Premium"
                  name="haspremium"
                  value={this.state.haspremium}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateMerchant.propTypes = {
  merchant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  merchant: state.merchant,
});

export default connect(mapStateToProps, { addMerchant })(CreateMerchant);

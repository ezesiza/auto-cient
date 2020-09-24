import React, { Component } from "react";
import { connect } from "react-redux";
import { getOneMerchant,editMerchant } from "../../actions/merchantActions";
import PropTypes from "prop-types";
import InputData from "./InputData";
import { Link } from "react-router-dom";

 class EditMerchant extends Component {
  state = {
    firstname: "",
    lastname: "",
    avatarurl: "",
    email: "",
    phone: "",
    haspremium: "",
    bidId: "",
    index:0
  };

  onChange = this.onChange.bind(this);
  onSubmit = this.onSubmit.bind(this);


  componentDidMount(){
    this.props.getOneMerchant(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.merchant.merchant){
      const merchant = nextProps.merchant.merchant;

      // merchant.firstname= merchant.firstname,
      // merchant.lastname= merchant.lastname,
      // merchant.avatarUrl= merchant.avatarUrl,
      // merchant.email= merchant.email,
      // merchant.phone= merchant.phone,
      // merchant.hasPremium= merchant.hasPremium,
      // merchant.bidId= merchant.bidId,

      this.setState({
        firstname:merchant.firstname,
        lastname:merchant.lastname,
        avatarurl:merchant.avatarurl,
        email:merchant.email,
        phone:merchant.phone,
        haspremium:merchant.haspremium,
        bidId:merchant.bidId,
        index:merchant.id
      })
    }
  }



  onSubmit(e) {
    e.preventDefault();
    const merchantData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      avatarurl: this.state.avatarurl,
      email: this.state.email,
      phone: this.state.phone,
      haspremium: this.state.haspremium,
      bidId: this.state.bidId,
      id:this.props.match.params.id,
    };
    this.props.editMerchant( merchantData, this.props.history);
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
              <h1 className="display-4 text-center">Edit Merchant Profile</h1>
              <p className="lead text-center">
                Use inputs below to create a Merchant
              </p>
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
                  name="avatarurl"
                  value={this.state.avatarurl}
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

EditMerchant.propTypes = {
  merchant: PropTypes.object.isRequired,
  editMerchant:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  merchant: state.merchant,
});
export default connect(mapStateToProps, {editMerchant, getOneMerchant})(EditMerchant)
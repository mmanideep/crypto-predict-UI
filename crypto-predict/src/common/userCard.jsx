import React from 'react';
import './userCard.css';

class UserCardComponent extends React.Component {

	constructor(props){
		super(props);
	}

// 	blockchain_account_key: "0x812778b2997e86d3195eF52D495d4bc586E0B6f8"
// created_at: "Mon, 25 Feb 2019 15:15:00 GMT"
// email: "rick.sanchez@yahoo.com"
// eth_balance: 0
// first_name: "Rick"
// id: "fbc9142e2f5d4f8ea8973bc42af39f6a"
// image_url: ""
// is_deleted: false
// last_name: "S"
// phone: "9876543210"
// updated_at: "Mon, 25 Feb 2019 15:15:00 GMT"
// user_name: "rick.sanchez"

	render(){

		let userData = this.props;

		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h3>{userData.user_name}</h3>
						<h4>{userData.first_name} {userData.last_name}</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default UserCardComponent;

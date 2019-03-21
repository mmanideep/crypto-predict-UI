import React from 'react';
import {Line}  from 'react-chartjs-2';
import './homePage.css';
import LogoutBtn from './../common/logoutBtn';
import UserCardComponent from './../common/userCard';
import { checkSession } from './../apiUtils/loginUtils';
import { getUserDetails } from './../apiUtils/userUtils';
import { getLastThirtyDaysStats } from './../apiUtils/cryptoUtils';
import { 
    Bitcoin, BitcoinCash, Dogecoin, Ethereum, 
    Litecoin, ALL_CRYPTO_CURRENCIES
} from './../constants';

class HomePageComponent extends React.Component {

    constructor(props){
        super(props);
        let today = new Date();
        this.state = {
            current_currency : Bitcoin,
            current_date: today.toLocaleDateString().split("/").join("-"),
            graphStats: {},
            userDetails: {}
        };
    }

    generateGraphStats(statsData) {
        let labels = [];
        let dataPoints = [];
        for (let i=0; i<statsData['Data'].length; i++){
            let current_date = new Date(statsData['Data'][i]['time'] * 1000);
            labels.push(current_date.toDateString());
            dataPoints.push(statsData['Data'][i]['close']);
        }

        return {
            labels: labels,
            datasets: [{
                label: this.state.current_currency,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataPoints,
            }]
        }
    }

    getStatsGraph() {
        let chartData = this.state.graphStats;
        return <Line data={chartData} className="h-75"/>;

    }

    fetchStats() {
        let comp = this;
        getLastThirtyDaysStats(this.state.current_currency, this.state.current_date).then(
            (response) => {
                let currenyGraphStats = comp.generateGraphStats(response.data['payload'])
                comp.setState(
                    {graphStats: currenyGraphStats},
                    ()=>{console.log(comp.state.graphStats)}
                );
            }
        )
    }

    loadingIndicatior() {
        return(
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    fetchUserDetails() {
        let comp = this;
        getUserDetails().then(
            (response) => {
                comp.setState({userDetails: response.data['payload']});
                console.log(response.data['payload']);
            }
        );
    }

    componentWillMount() {
        let is_session_runing = checkSession();
        if (is_session_runing === false){
            this.props.history.push('/login');
        }
        this.fetchStats();
        this.fetchUserDetails();
    }

    render() {

        let comp = this;

        return(
            <div className="container-fluid">
                <div className="row header">
                    <div className="col-sm-10">
                        <h2>Crypto Predict</h2>
                    </div>
                    <div className="col-sm-2">
                        <LogoutBtn />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 h-100">
                        <UserCardComponent {...comp.state.userDetails} />
                    </div>

                    <div className="col-sm-2 h-100">
                        <select onChange={
                            (event) => {
                                comp.setState({
                                    current_currency:event.target.value,
                                    graphStats: {}
                                }, () => comp.fetchStats())
                            }
                        }>
                            <option value={Bitcoin}>{Bitcoin}</option>
                            <option value={BitcoinCash}>{BitcoinCash}</option>
                            <option value={Dogecoin}>{Dogecoin}</option>
                            <option value={Litecoin}>{Litecoin}</option>
                            <option value={Ethereum}>{Ethereum}</option>
                        </select>
                    </div>

                    <div className="col-sm-8 h-100">
                        <h4>{comp.state.current_currency} Metrics</h4>
                        { 
                            Object.keys(comp.state.graphStats).length > 0 ? 
                            comp.getStatsGraph() : 
                            comp.loadingIndicatior()
                        }
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default HomePageComponent;

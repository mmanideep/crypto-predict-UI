import React from 'react';
import {Line}  from 'react-chartjs-2';
import './homePage.css';
import LogoutBtn from './../common/logoutBtn';
import { checkSession } from './../apiUtils/loginUtils';
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
            graphStats: {}
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
        return <Line data={chartData} height={100} />;

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
                console.log(response.data['payload']);
            }
        )
    }

    componentWillMount() {
        let is_session_runing = checkSession();
        if (is_session_runing === false){
            this.props.history.push('/login');
        }
        this.fetchStats();
    }

    render() {

        let comp = this;

        return(
            <div className="container-fluid">
                <div className="row header">
                    <div className="col-10">
                        <h2>Crypto Predict</h2>
                    </div>
                    <div className="col-2">
                        <LogoutBtn />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <h4>{comp.state.current_currency} Metrics</h4>
                        { Object.keys(comp.state.graphStats).length > 0 ? comp.getStatsGraph() : null}
                    </div>
                    <div className="col-2">
                        <select onChange={
                            (event) => {
                                comp.setState({current_currency:event.target.value}, () => comp.fetchStats())
                            }
                        }>
                            <option value={Bitcoin}>{Bitcoin}</option>
                            <option value={BitcoinCash}>{BitcoinCash}</option>
                            <option value={Dogecoin}>{Dogecoin}</option>
                            <option value={Litecoin}>{Litecoin}</option>
                            <option value={Ethereum}>{Ethereum}</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePageComponent;

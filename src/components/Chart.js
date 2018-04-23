import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';





class Chart extends Component{

    
    constructor(props){
        super(props)
        this.state = {
            data: this.chartdata()
        }
        
        this.labels=[]
        this.datalist=[]
    }

    updatedata(){
        // this.state = {
        //     data: this.chartdata()
        // }

        console.log('chartdata',this.chartdata())

        this.setState({
            data: this.chartdata()

        })
        
    }

    chartdata(){
        return {
            labels: this.labels,
            datasets: [
            {
                label: 'My First dataset',
                // fillColor: 'rgba(220,220,220,0.2)',
                // strokeColor: 'rgba(220,220,220,1)',
                // pointColor: 'rgba(220,220,220,1)',
                // pointStrokeColor: '#fff',
                // pointBackgroundColor: '#1e74ff',
                // pointHighlightFill: '#fff',
                // pointHighlightStroke: 'rgba(220,220,220,1)',
                data: this.datalist,
                lineTension: 1,
                borderColor: '#1e74ff',
                backgroundColor: 'rgba(0,0,0,0)'
            }],
            options:{
                responsive: false,
                maintainAspectRatio: false,
                
                scales:{
                    yAxes:[{
                        display: true,
                        ticks:{
                            beginAtZero: true,
                            steps:5,
                            stepValue: 5000,
                            max:30000

                        }
                    }]
                }

            }
        }
    }



    componentDidMount(){
        console.log("inside did mount")

        var myheaders = new Headers()
        myheaders.append('Content-Type','application/json')
        // application/x-www-form-urlencoded

        fetch('http://localhost:3001/petition',{
            method: 'POST',
            headers: myheaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                petition_num: 201953,
                start_dt: "2018-04-20T10:22:43.179Z",
                end_dt: "2018-04-20T12:47:38.270+0000"
            })
        }).then(response=> {
            return response.json()
        })
        .catch(error=>{
            console.error('error:',error)
        })
        .then(data =>{
            console.log(data)


            console.log("debug2")

            if(data.result === 0){
                console.log("result is zero")
                return
            }

            console.log("debug1")

            var datalist = data.data
            var newlabels=[]
            var newdata=[]
            for(var i=0;i<datalist.length;i++){
                newlabels.push(datalist[i].datetime)
                newdata.push(datalist[i].petition_count)
            }

            console.log('newlabels',newlabels)
            console.log('newdata',newdata)

            this.labels = newlabels
            this.datalist = newdata

            this.updatedata()


        })
    }

    render (){
        return (
            <div className="chart" >
             <Line
                data = {this.state.data}
                options={{
                    responsive: true,
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    maintainAspectRatio: true,
                    scales:{
                        yAxes:[{
                            display: true,
                            ticks:{
                                
                                callback: function(value,index,values){
                                    var newstr = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    return newstr
                                }
    
                            }
                        }],
                        xAxes:[{
                            type: 'time',
                            distribution: 'linear'
                        }

                        ]
                    }
    
                }}
             />
            </div>
        )
    }
}

export default Chart;
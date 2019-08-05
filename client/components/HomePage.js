import React, { Component } from "react";
import './HomePage.css'
import Card from './Card'
import Cookies from 'js-cookie';
import SearchBox from './SearchBox.js';
const names = ['Jimmy ', 'Will ', 'Schno '];
const urls = ['https://media.licdn.com/dms/image/C4E03AQHOMZg1CciNww/profile-displayphoto-shrink_100_100/0?e=1570665600&v=beta&t=JklTNb0GqQHzzre2hYxXUtEbB-B5_E3Xz01d1aHH4t0',
'https://media.licdn.com/dms/image/C4D03AQFmD1B7L-NyDg/profile-displayphoto-shrink_800_800/0?e=1570665600&v=beta&t=iJF1YP14DJCUMA-dVsC7GvweyB_Mx4Ue12Ht-tAslZQ',
'https://media.licdn.com/dms/image/C5603AQGUwZlmkb2hEQ/profile-displayphoto-shrink_800_800/0?e=1570665600&v=beta&t=rbanoTOd1UvsOfnBCL9kiCaAYZceED4mJ0Z1lnjBX4Q'
];
const companies = ['Google', 'Amazon','Codesmith']


const profiles = [
    {name:names[0], url:urls[0], company:companies[0]}, 
    {name:names[1], url:urls[1], company:companies[1]}, 
    {name:names[2], url:urls[2], company:companies[2]}
    
]


class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: Cookies.get('access_token'),
            searchFieldName:'',
            searchFieldCompany:'',
            names:names,
            company:companies,
            profiles:profiles,
        }
    }
    onSearchName = (event) =>{
        this.setState({searchFieldName:event.target.value})
    }
    onSearchCompany = (event) =>{
        this.setState({searchFieldCompany:event.target.value})
   }
    render(){
        //each card will have props that will b passed down
        //test data
        
            const filterProfiles = this.state.profiles.filter(el=>{        
                return (el.name.toLowerCase().includes(this.state.searchFieldName.toLowerCase())
                 && el.company.toLowerCase().includes(this.state.searchFieldCompany.toLowerCase()))
            })
                
            const cardsDisplay = [];
                
            for(let i = 0; i < filterProfiles.length; i++){
                cardsDisplay.push(<Card id = {i} key = {i} 
                name={filterProfiles[i].name} 
                url={filterProfiles[i].url}  
                company={filterProfiles[i].company}      
            />
            )
        }

        //need to fetch from DB to get all the cards 
        //<Card id = {}, key = {}/> 
        if(this.state.username){
            //tc is text center
            console.log(cardsDisplay);
            return(
               <div className='bg-silver tc'> 
                <h1>LinkedIn Files </h1>
                <SearchBox searchChange={this.onSearchName} placeholder={'name'}/>
                <SearchBox searchChange={this.onSearchCompany} placeholder={'Company'}/>
                {cardsDisplay}
               </div>
                )
        }
        else{
            return('nothing')
        }
    }
}
export default HomePage
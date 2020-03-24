import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";

class LinkList extends Component {

    constructor() {
        super();
        this.state = {
            linksList: [""],
            title: "",
            longUrl: "",
        };
    }

    componentDidMount() {
        var url = "http://localhost:8082/links";

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            console.log(results);
            this.setState({linksList: results.links})
        })
    }

    deleteLink(idLink) {
        const url = "http://localhost:8080/link/delete/"+idLink;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleDelete (idLink) {
        return event => {
            event.preventDefault();
            this.deleteLink(idLink);
            let filteredArray = this.state.linksList.filter(item => {
                console.log(item.id);
                return idLink !== item.id;
            });
            console.log(filteredArray);
            this.setState({linksList: filteredArray});

        }
    }

    shortLink() {
        const url = `http://localhost:8082/link/short`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                longUrl: this.state.longUrl,
            })
        }).then(results => results.json())
        .then((body)=>{
                console.log(body.link);
                let filteredArray = this.state.linksList;
                filteredArray.unshift(body.link);
                this.setState({linksList: filteredArray})
        })
    }

    handleSubmit =
        event => {
            event.preventDefault();
            // this.togglePopup();
            this.shortLink();

        }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let links = this.state.linksList.map((link) => {
            return (
                <div className="link-details" key={link.id}>
                    <div className="title">
                        <h3>{link.title}</h3>
                        <a href={`http://localhost:8080/${link.shortUrl}`} className="short-url">localhost:8080/{link.shortUrl}</a>
                    </div>
                    <div className="description-content">
                        <div className="number-entries">
                            <p>Ilość unikalnych kliknięć: {link.numberUniqueEntries}</p>
                        </div>
                        <div className="place-button">
                            <div className="button-blue" onClick={this.handleDelete(link.id)}>Usuń</div>
                            <NavLink className="button-blue" to={`/admin/apartment/edit/${link.id}`}>Edytuj</NavLink>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <React.Fragment>
                <div id="container">
                    <div id="content">
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Popularne linki:
                                </h1>
                                <form onSubmit={this.handleSubmit} className="add-link" method="none">
                                    <div className="input-inline">
                                        <label htmlFor="name">Tytuł:</label>
                                        <input type="text" required id="name" className="all-width" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="input-inline ml-20">
                                        <label htmlFor="name">Url:</label>
                                        <input type="text" required id="url" className="all-width" name="longUrl" value={this.state.longUrl} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <button className="button-blue all-width">Wygeneruj link</button>

                                </form>
                                {links}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

export default LinkList;

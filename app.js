
var Bar = React.createClass({

    render: function () {
        const pointWidth = ((100 / this.props.genres.length).toFixed(1)).toString() + '%';
        return <div className="bar">
            {   
                this.props.genres.map(function (el) {
                    return <div key={el.name} className="point" style={{ width: pointWidth, background: genres.find(x=> x.name == el).color }}>
                            
                    </div>
                })
            }
        </div>;
    }
});

var YearBar = React.createClass({
    getInitialState: function() {
        return { leftValue : this.props.years.left, rightValue: this.props.years.right }
    },

    componentWillReceiveProps: function(props){
        if(props.years.left !== this.state.leftValue || props.years.right !== this.state.rightValue){
            this.setState({ leftValue : props.years.left, rightValue: props.years.right });
        }
    },

    getOffset: function (value) {
        return ((value - 1915)*0.96).toString() + '%';
    },
    
    leftchangeHandler: function (e) {
        const value = parseInt(e.target.value);
        if (value > this.state.rightValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ leftValue: value });
        }
        

    },

    rightchangeHandler: function (e) {
        const value = parseInt(e.target.value);
        if (value < this.state.leftValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ rightValue: value });
        }
    },
    
    render: function () {
        
        return <div className="year-bar">
            <div className="year-bar-wrapper">
                <label style={{left: this.getOffset(this.state.leftValue)}} id="left-label">{this.state.leftValue}</label>

                <input type="range" min="1915" max="2016" id="left" name="year" value={this.state.leftValue} 
                    onChange={this.leftchangeHandler} onKeyUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} 
                    onMouseUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} />
            </div>
            <div className="year-bar-wrapper">
                <input type="range" min="1915" max="2016" id="right" name="year" value={this.state.rightValue} onChange={this.rightchangeHandler} 
                        onKeyUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} 
                    onMouseUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})}/>

                <label style={{left: this.getOffset(this.state.rightValue)}} id="right-label">{this.state.rightValue}</label>
            </div>
            
        </div>
    }
});

var RateBar = React.createClass({
    getInitialState: function () {
        return { leftValue : this.props.rate.min, rightValue: this.props.rate.max }
    },
    
    componentWillReceiveProps: function(props){
        if(props.rate.min !== this.state.leftValue || props.rate.max !== this.state.rightValue){
            this.setState({ leftValue : props.rate.min, rightValue: props.rate.max });
        }
    },

    getOffset: function (value) {
        return ((value - 1) / 9 * 97.6).toString() + '%';
    },
    
    leftchangeHandler: function (e) {
        const value = parseFloat(e.target.value);
        if (value > this.state.rightValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ leftValue: value });
        }
        

    },
    
    rightchangeHandler: function (e) {
        const value = parseFloat(e.target.value);
        if (value < this.state.leftValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ rightValue: value });
        }
    },
    
    render: function () {
        
        return <div className="year-bar">
            <div className="year-bar-wrapper">
                <label style={{left: this.getOffset(this.state.leftValue)}} id="left-label">{this.state.leftValue}</label>

                <input type="range" min="1.0" max="10.0" id="left" name="year" value={this.state.leftValue} step="0.1"
                    onChange={this.leftchangeHandler} onKeyUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} 
                    onMouseUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} />
            </div>
            <div className="year-bar-wrapper">
                <input type="range" min="1.0" max="10.0" id="right" name="year" value={this.state.rightValue} step="0.1"
                onChange={this.rightchangeHandler} onKeyUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})} 
                    onMouseUp={this.props.blurHandler.bind(null, {left: this.state.leftValue, right: this.state.rightValue})}/>

                <label style={{left: this.getOffset(this.state.rightValue)}} id="right-label">{this.state.rightValue}</label>
            </div>
            
        </div>
    } 
});

var CheckBox = React.createClass({
    getInitialState: function(){
        return {active: this.props.checked ? 'active': ''};
    },

    componentWillReceiveProps: function(props){
        if(props.checked !== !!this.state.active)
        {
            this.setState({active: props.checked ? 'active': ''});
        }
    },

    clickHandler: function (e) {
        var c = this.state.active ? '' : 'active';
        this.setState({ active: c});
        
    },

    render: function(){
        return <div key={this.props.el.name}>
            <label  className='btn btn-default'>
                <input id={this.props.el.name} type="checkbox" autoComplete="off"  onClick={this.clickHandler} onChange={this.props.changeHandler.bind(null, this.props.prevGenres)} checked={!!this.state.active} name="genres" value={this.props.el.name} />
                <span className={"glyphicon glyphicon-ok " + this.state.active}></span>
            </label>
            <label className="label-name" style={{color: this.props.el.color}} htmlFor={this.props.el.name}>{this.props.el.name}</label>
        </div>
    }
});

var CheckBoxList = React.createClass({
    getInitialState: function(){
        return {genres: this.props.genres, prevGenres: this.props.genres};
    },

    componentWillReceiveProps: function(props){
        if(JSON.stringify(props.genres !== JSON.stringify(this.state.genres))){
            this.setState({prevGenres: this.props.genres, genres: props.genres});
        }
    },

    render: function() {

        return (<div className="genres">
            <CheckBox key="All" el={{name: 'All', color:'black'}} prevGenres={this.state.prevGenres} checked={this.state.genres.length == 0} changeHandler={this.props.resetCheckboxes}/>
            {
                genres.map(function (el) {
                    
                    let checked = this.state.genres.find(function(genre){return genre === el.name }) ? true : false;
                    return <CheckBox key={el.name} el={el} changeHandler={this.props.changeHandler} checked={checked}/>
                    }, this)
            }
        </div>);
    }
});

var Switcher = React.createClass({

    shouldComponentUpdate: function(props){
        return props.checked !== this.props.checked;
    },

    render: function(){
        
        return <div className="switch">
                    <input type="radio" id="Any" name="switch" checked={this.props.checked} onChange={this.props.changeHandler} value="Any"/>
                    <label htmlFor="Any">Any</label>
                    <input type="radio" id="All" name="switch" checked={!this.props.checked} onChange={this.props.changeHandler} value="All"/>
                    <label htmlFor="All">All</label>  
                </div>;
    }
})

var Film = React.createClass({

    render: function () {
        return <div className="film">
            <div className="rating">{this.props.rating}</div>
            <div className="name">{this.props.name} </div>
            <Bar genres={this.props.genres} />
        </div>;
    }
});

var FilmsList = React.createClass({

    render: function(){
        var films = this.props.films.map(function (film) {
            const genres = film.Genres.intersect(this.props.genres);
            return <Film key={film.Name} name={film.Name} genres={genres} rating={film.IMDB} />
        }, this)
        return (<div className="year">
                    <h3>{this.props.year}</h3>
                    <div className="films">{films}</div>
                </div>);
    }
});

var Films = React.createClass({
    
    STORAGE : 'filmsSettings',

    DEFAULT_SETTINGS: {
            isLoaded: false,
            genres: ['All'],
            years: { left: 1915, right: 2016 },
            rate: {min : 1.0, max: 10.0 },
            isAny: true 
        },

    getInitialState: function(){
        if(localStorage[this.STORAGE])
        {
           return JSON.parse(localStorage[this.STORAGE]);
        }

        return this.DEFAULT_SETTINGS;
        
    },

    componentDidMount:function(){

        window.onunload = function()
        {
           // save state
           let settings = this.state;
           settings.isLoaded = false; //for update films in next time 
           localStorage[this.STORAGE] = JSON.stringify(settings);
        }.bind(this);

        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'films.json', true);

        xhr.send();

        xhr.onreadystatechange = function() {

            if (xhr.readyState != 4) return;
            
            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } 
            else {
                let films = JSON.parse(xhr.responseText);
                this.allFilms = films;
                this.setState({isLoaded: true});
            }

        }.bind(this);
    },
    

    handleFilter: function (state, event) {
        let genres = this.state.genres;
        if(event.target.checked){
            if(genres.indexOf(event.target.value) == -1)
            {
                genres.push(event.target.value);
            }
            
        }
        else{
            let pos = genres.indexOf(event.target.value);
            if(pos != -1){
                genres.splice(pos, 1);
            }
        }
        this.setState({genres: genres});
    },

    resetCheckboxes: function(prevGenres, e){
        if(!e.target.checked){
            this.setState({genres: prevGenres});
        }
        else{
            this.setState({genres: ["All"]});   
        }
    },

    changeYears: function(state, e){
            this.setState({ years: {left: state.left, right: state.right} });
    },

    changeRate: function(state, e){
        this.setState({rate: {min: state.left, max: state.right}});
    },

    switcherHandler: function(e){
        const switchAny = !this.state.isAny;
        this.setState({isAny: switchAny});
    },

    resetHandler: function(e){
        this.DEFAULT_SETTINGS.isLoaded = true; // films do not uplod from server when reset
        this.setState(this.DEFAULT_SETTINGS); // OOPPPPSSS
    },


    render: function () {
        
        var filmsList = [];

        if(this.state.isLoaded)
        {
            // filter films
            // filter by genres
            console.log(this.state.genres);
            let filteredFilms = this.state.genres.length > 1 ? this.allFilms.filter(function (el) {
                    if(this.state.isAny)
                    {
                        return el.Genres.intersect(this.state.genres, x => x.name).length > 0; // filter by genres
                    }
                    return el.Genres.intersect(this.state.genres).length === this.state.genres.length - 1;
                }, this).groupBy(x => x.Year) : this.allFilms.groupBy(x => x.Year);
            console.log(filteredFilms);
            var props = Object.keys(filteredFilms)
                .filter(x => parseInt(x) >= this.state.years.left && parseInt(x) <= this.state.years.right) // filter by years
                .sort(function (a, b) { return b - a; });
            
            props.forEach(function(key){
                // filter films by rating
                let films = filteredFilms[key].filter(x => x.IMDB >= this.state.rate.min && x.IMDB <= this.state.rate.max); 

                filmsList.push(<FilmsList key={key} year={key} genres={this.state.genres} films={films} />);
            }, this);
            //
             
             return (    
            <div>
                <CheckBoxList changeHandler={this.handleFilter} resetCheckboxes={this.resetCheckboxes} genres={this.state.genres} />
                <div id="settings-container">
                    <YearBar blurHandler={this.changeYears} years={this.state.years}/>
                    <RateBar blurHandler={this.changeRate} rate={this.state.rate}/>
                    <Switcher changeHandler={this.switcherHandler} checked={this.state.isAny}/>
                    <button onClick={this.resetHandler} id="reset"><span className="glyphicon glyphicon-repeat"></span></button>
                    <label htmlFor="reset">Reset</label>
                </div>
                <div id="films-container"> {filmsList}</div> 
            </div>
            );
        }

        return <div>Loading...</div>;
       
    }
    
});

ReactDOM.render(<Films />, document.getElementById('container'));
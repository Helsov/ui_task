const Router = window.ReactRouter.Router;
const Route = window.ReactRouter.Route;
const hashHistory = window.ReactRouter.hashHistory;
const Link = window.ReactRouter.Link;

class ShowPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        var self = this;
        axios.post('/getPost',{})
        .then((response) => {
            console.log(response)
            self.setState({
                posts:response.data
            })
        })
        .catch((error) => {
            console.log('Ошибка', error)
        })
    }

    render(){
        return(
            <div class="list-group">
               {
                   this.state.posts.map((post, index) => {
                       return <a href='#' key={index} className='list-gtoup-item active'>
                        <h4 className='list-group-item-heading'>{post.title}</h4>
                        <p className='list-group-item-text'>{post.subject}</p>
                       </a>
                   })
               }
            </div>
        )
    }
}

class AddPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            subject: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.addPost = this.addPost.bind(this)
    }

    handleTitleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    handleSubjectChange(e){
        this.setState({
            subject: e.target.value
        })
    }

    addPost(){
        axios.post('/addPost',{
            title: this.state.title,
            subject: this.state.subject
        })
        .then((response) => {
            console.log(`Запись добавлена`, response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <div className="col-mf-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both"/>
                        <div className="form-group">
                            <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" placeholder="Заголовок" required/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Описание" maxlength="140" rows="7"></textarea>
                        </div>
                        <button type="button" id="submit" onClick={this.addPost} name="submit" className="btn btn-primary pull-right">Добавить запись</button>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost"></Route>
    </Router>,
    document.getElementById('app'));
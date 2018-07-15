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
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    //Получаем данные из БД и сохраняем в массив через компонент который вызывется после рендеринга компонента, удобен для запроса к удаленным ресурсам
    componentDidMount(){
        document.getElementById('homeHyperlink').className = "active";
        document.getElementById('addHyperLink').className = "";
        this.getPost();
    }

    //добавялет id записи в урл к гет запросу
    updatePost(id){
        hashHistory.push('/addPost/' + id);
    }

    //Получаем сведения о записи
    getPost(){
        var self = this;
        axios.post('/getPost', {
        })
        .then((response) => {
          console.log('Запись удалена ',response);
          self.setState({posts:response.data})
        })
        .catch((error) => {
          console.log('error is ',error);
        });
      }
    
    //Удалаем запись
    deletePost(id){
        if (confirm('Действительно удалить?')){
            var self = this;
            axios.post('/deletePost',{
                id: id
            })
            .then((response) => {
                console.log(response);
                self.getPost();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    render(){
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Заголовок</th>
                        <th>Описание</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.posts.map((post, index)=>{
                            return <tr key={index}>
                                        <th>{index + 1}</th>
                                        <th>{post.name}</th>
                                        <th>{post.title}</th>
                                        <th>{post.subject}</th>
                                        <th><span onClick={this.updatePost.bind(this, post._id)} className="glyphicon glyphicon-pencil"></span></th>
                                        <th><span onClick={this.deletePost.bind(this,post._id)} className="glyphicon glyphicon-remove"></span></th>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
        )
    }
}

class AddPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            subject: '',
            id: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.addPost = this.addPost.bind(this)
        this.getPostWithId = this.getPostWithId.bind(this);
    }

    componentDidMount(){
        document.getElementById('addHyperLink').className = "active";
        document.getElementById('homeHyperlink').className = "";

        this.getPostWithId();
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
            subject: this.state.subject,
            id: this.props.params.id
        })
        .then((response) => {
            console.log(`Запись добавлена`, response);
            hashHistory.push('/');
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //Получаем данные редактируемой записи задаем новый урл /getPostWithId
    getPostWithId(){
        console.log(this.props.params.id);
        var id = this.props.params.id;
        var self = this;
        axios.post('/getPostWithId',{
            id: id
        })
        .then((response) => {
            if(response){
              self.setState({
                  title:response.data.title,
                  subject:response.data.subject
            });
            }
          })
          .catch( (erro) => {
            console.log('ошибка ',error);
          });
    }

    render(){
        return(
            <div className="col-mf-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both"/>
                        <div className="form-group">
                            <input value={this.state.title} type="text" onChange={this.handleTitleChange} className="form-control" id="title" placeholder="Заголовок" required/>
                        </div>
                        <div className="form-group">
                            <textarea value={this.state.subject} className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Описание" maxlength="140" rows="7"></textarea>
                        </div>
                        <button type="button" id="submit" onClick={this.addPost} name="submit" className="btn btn-primary pull-right">Создать/Изменить</button>
                    </form>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
    </Router>,
    document.getElementById('app'));
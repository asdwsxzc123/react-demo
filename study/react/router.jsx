
// 页面路由
window.location.href = 'http://www.baidu.com'
history.back()

// hash路由
window.location = '#hash'
window.onhashchange = function () {
  console.log('current hash:', window.location.hash);
}

// h5路由
history.pushState('name', 'title', '/path')
history.replaceState('name', 'title', '/path')

window.onpopstate = function () {
  console.log(window.location.href);
  console.log(window.location.pathname);
}

// browserrouter hashrouter

class A extends React.Component{
  constructor(props) {
    super(props)

  }
  render() {
    return (<div>component a
      参数是:{this.props.match.params.id}
      <Switch>
        <Route exact path={`${this.props.match.path}`} render={(route)=> {return <div>不带参数</div>}}></Route>
        <Route path={`${this.props.match.path}/:id`} render={(route) => {return route.match.params.id }}></Route>
      </Switch>
    </div>)
  }
}
class B extends React.Component{
  constructor(props) {
    super(props)

  }
  render() {
    return <div>component b</div>
  }
}
class Wrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
      <Link to="/a">a</Link>
      <br/>
      <Link to="/b">b</Link>
      <Link to="/a/123">带参数的a</Link>
      {this.props.children}
      </div>
    )
  }
}
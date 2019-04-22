
/* 
constr
will
render
didmount
shouldcomupdate
willupdate
render
didupdate
*/
class Component extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: 'old'
    }
    console.log('constr');
  }
  // 组件将要加载
  componentWillMount() {
    console.log('will');
  }
  // 组件加载完成
  componentDidMount() {
    console.log('didmount');
  }
  // 组件将要更新
  componentWillUpdate () {
    console.log('willupdate');
  }
  // 组件更新完成
  componentDidUpdate() {
    console.log('didupdate');
  }
  // 接受父组件的传值
  componentWillReceiveProps() {
    console.log('willRecive');
  }
  // 子组件是不是应该更新,true才更新
  shouldComponentUpdate() {
    console.log('shouldcomupdate');
    return true;
  }
  // 组件销毁时
  componentWillUnmount() {
    // 干掉定时器
  }
  handleClick() {
    // setState是异步函数,不是同步
    this.setState({
      data: 'new' 
    })
  }
  render() {
    console.log('render');
    return (
      <div>
      <div>app</div>
      <button onClick={()=>this.handleClick()}>更新</button>
      </div>
    )
  }
}
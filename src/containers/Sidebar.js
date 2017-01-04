import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import '../static/styles/Sidebar.css'
// 定义默认样式
const defaultStyles = {
  root: {
    overflow: 'hidden',
  },
  // 侧边栏
  sidebar: {
    zIndex: 1001,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto'
  },
  // 遮罩层
  overlay: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    transition: '.3s ease-out',
    WebkitTransition: '.3s ease-out',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  }
}

export default class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 侧边栏宽度
      sidebarWidth: 0
    }
    // 点击遮罩层
    this.overlayClicked = this.overlayClicked.bind(this)
  }

  componentDidMount() {
    this.saveSidebarWidth()
  }

  saveSidebarWidth() {
    const width = ReactDOM.findDOMNode(this.refs.sidebar).offsetWidth;

    if (width !== this.state.sidebarWidth) {
      this.setState({sidebarWidth: width});
    }
  }

  overlayClicked() {
    // 遮罩层点击时，如果侧边栏显示，就隐藏
    this.props.onSetOpen(false)
  }

  render() {
    // 侧边栏样式
    const sidebarStyle = {...defaultStyles.sidebar, ...this.props.styles.sidebar}
    // 遮罩层样式
    const overlayStyle = {...defaultStyles.overlay}
    const rootProps = {
      className: this.props.rootClassName,
      style: {...defaultStyles.root, ...this.props.styles.root},
    }

    // 侧边栏在左侧还是右侧
    if (this.props.pullRight) {
      sidebarStyle.right = 0;
      sidebarStyle.transform = 'translateX(100%)';
      sidebarStyle.WebkitTransform = 'translateX(100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    } else {
      sidebarStyle.left = 0;
      sidebarStyle.transform = 'translateX(-100%)';
      sidebarStyle.WebkitTransform = 'translateX(-100%)';
      if (this.props.shadow) {
        sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
      }
    }

    // 根据 show 来判断显隐
    const {show} = this.props
    if(show) {
      // 如果显示
      sidebarStyle.transform = ''
      sidebarStyle.WebkitTransform = ''
      overlayStyle.opacity = 1
      overlayStyle.visibility = 'visible'
    } else {
      sidebarStyle.transform = 'translateX(-100%)';
      sidebarStyle.WebkitTransform = 'translateX(-100%)';
      overlayStyle.opacity = 0
      overlayStyle.visibility = 'hidden'
    }

    return (
      <div {...rootProps}>
        <div className= "sidebar" style={sidebarStyle} ref="sidebar">
          {this.props.children}
        </div>
        <div 
          className= "sidebar__overlay"
          style={overlayStyle}
          role="presentation"
          tabIndex="0"
          onClick={this.overlayClicked}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  // 侧边栏内容区域
  children: React.PropTypes.node.isRequired,

  // styles
  styles: React.PropTypes.shape({
    root: React.PropTypes.object,
    sidebar: React.PropTypes.object,
  }),

  // root component optional class
  rootClassName: React.PropTypes.string,

  // sidebar optional class
  sidebarClassName: React.PropTypes.string,
  // overlay optional class
  overlayClassName: React.PropTypes.string,

  // boolean if sidebar should be docked
  docked: React.PropTypes.bool,

  // boolean if sidebar should slide open
  open: React.PropTypes.bool,

  // boolean if transitions should be disabled
  transitions: React.PropTypes.bool,
  // Place the sidebar on the right
  pullRight: React.PropTypes.bool,

  // Enable/Disable sidebar shadow
  shadow: React.PropTypes.bool,
  // callback called when the overlay is clicked
  onSetOpen: React.PropTypes.func,
};

Sidebar.defaultProps = {
  docked: false,
  open: false,
  transitions: true,
  pullRight: false,
  shadow: true,
  onSetOpen: () => {},
  styles: {},
};
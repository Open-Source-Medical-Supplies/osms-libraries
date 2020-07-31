import PropTypes from 'prop-types';
import { PureComponent, ReactElement } from 'react';
import ReactMarkdown, { Renderer } from 'react-markdown';

function isParagraphChild(el: ListItemHandler): boolean {
  return (
    el.props && el.props.children &&
    el.props.children instanceof Array &&
    el.props.children[0] &&
    (
      el.props.children[0].type === 'p' ||
      el.props.children[0].key.includes('paragraph')
    )
  );
}

function paragraphToListItem (el: ListItemHandler): ReactElement {
  return el.props.children[0].props;
}

class ListItemHandler extends PureComponent {
  static defaultProps = {
    language: ''
  };
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  props: any;
  
  render() {
    const renderProps = isParagraphChild(this) ?
                    paragraphToListItem(this) : this.props;
    return (ReactMarkdown.renderers.listItem as Renderer<any>)(renderProps);
  }
}

export default ListItemHandler;


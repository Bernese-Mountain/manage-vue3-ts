<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      const iconClass = icon + ' side-bar-icon skin-iconBg';
      // vnodes.push(<svg-icon icon-class={icon}/>);
      vnodes.push(<i class={iconClass} />);
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    return vnodes;
  }
};
</script>

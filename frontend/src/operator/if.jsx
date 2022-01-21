const If = (props) => {
  if (props.show) {
    return props.children;
  } else {
    return false;
  }
};

export default If;

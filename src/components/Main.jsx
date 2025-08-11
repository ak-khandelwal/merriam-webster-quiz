const mainStyle = {
  width: "80vmin",
  margin: "0 auto",
};
// .main {
//   width: calc(80vmin);
//   margin: 0 auto;
// }
function Main({ children }) {
  return <main style={mainStyle}>{children}</main>;
}

export default Main;

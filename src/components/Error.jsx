// .error {
//   text-align: center;
//   font-size: 1.6rem;
//   font-weight: 500;
//   padding: 2rem;
//   background-color: #495057;
//   border-radius: 100px;
// }
const errorStyle = {
  textAlign: "center",
  fontSize: "1.6rem",
  fontWeight: 500,
  padding: "2rem",
  backgroundColor: "#495057",
  borderRadius: "100px",
};

function Error() {
  return (
    <p style={errorStyle}>
      <span>💥</span> There was an error fecthing questions.
    </p>
  );
}

export default Error;

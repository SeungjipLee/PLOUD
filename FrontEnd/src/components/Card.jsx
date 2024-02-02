const Card = ({ header, footer, children }) => (
    <div>
      {header && <header>{header}</header>}
      <main>
        {children}
      </main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
  
export default Card;
  
// {
//   categoryId: 1,
//   currentPeople: 1,
//   isPrivate: false,
//   managerId: "kyd1126",
//   maxPeople: 3,
//   password: null,
//   sessionId: "session0",
//   speechId: -1,
//   title: "asdfasdf",
// },
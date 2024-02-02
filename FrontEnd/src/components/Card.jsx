const Card = ({ header, footer, children }) => (
    <div className="Card">
      {header && <header>{header}</header>}
      <main>
        {children}
      </main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
  
  export default Card;
  
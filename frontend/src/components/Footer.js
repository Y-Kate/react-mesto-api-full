import React from 'react';
import { Route } from 'react-router-dom';

function Footer() {
  const [year, setYear] = React.useState(2021);


  React.useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    setYear(year)
  }, []);

  return (
    <Route exact path='/'>
      <footer className="footer">
        <p className="footer__copyright">&copy; {year} Kate_Y</p>
      </footer>
    </Route>
  );
}

export default Footer;

import { Box } from '@mui/material';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <Box
        component="div"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          padding: '10px',
          textAlign: 'center',
        }}
      > 
     <div className={styles.inner}>&#169; 2023 </div>
      </Box>
     
    </footer>
  );
};

export default Footer;

import { useEffect } from 'react';
import Feedback from '../../Component/CitizenComponent/FeedbackPageComponent/Feedback';
import Header from '../../Component/CitizenComponent/HomeComponet/Header';
import Footer from '../../Component/CitizenComponent/HomeComponet/Footer';
const FeedbackPage = () => {
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='space-y-20'>
        <Header page={true}></Header>
      <Feedback></Feedback>
    <Footer></Footer>
    </div>
  );
};

export default FeedbackPage;
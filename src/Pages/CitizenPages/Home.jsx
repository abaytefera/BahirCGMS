import React from 'react'
import HeaderHero from '../../Component/CitizenComponent/HomeComponet/HeaderHero'

import AboutSection from '../../Component/CitizenComponent/HomeComponet/About'
import ProcessSection from '../../Component/CitizenComponent/HomeComponet/ProcessSection'
import ImpactSection from '../../Component/CitizenComponent/HomeComponet/ImpactSection'
import WhyChooseSection from '../../Component/CitizenComponent/HomeComponet/WhyChooseSection'
import ApproachSection from '../../Component/CitizenComponent/HomeComponet/ApproachSection'
import TestimonialsSection from '../../Component/CitizenComponent/HomeComponet/TestimonialsSection'
import UserSelection from '../../Component/CitizenComponent/HomeComponet/UserRolesSection'
import StayInformedCTA from '../../Component/CitizenComponent/HomeComponet/StayInformedCTA'
import Footer from '../../Component/CitizenComponent/HomeComponet/Footer'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
   <HeaderHero ></HeaderHero>
<AboutSection></AboutSection>
<ProcessSection></ProcessSection>
<ImpactSection></ImpactSection>
<WhyChooseSection></WhyChooseSection>
<ApproachSection></ApproachSection>
<UserSelection></UserSelection>
<TestimonialsSection></TestimonialsSection>
< Footer></Footer>

    </div>
  )
}

export default Home

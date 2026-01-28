import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import GoldRates from '@/components/GoldRates'
import Services from '@/components/Services'
import BranchFinder from '@/components/BranchFinder'
import Footer from '@/components/Footer'
import FixedActionBar from '@/components/FixedActionBar'
import GoldInquiryForm from '@/components/GoldInquiryForm'
import GoldValuationProcess from '@/components/GoldValuationProcess'
import FaQs from '@/components/FaQs'
import BestGoldByers from '@/components/BestGoldBuyers'
import ValueGold from '@/components/ValueGold'
import WhyChooseValueGold from '@/components/WhyChooseValueGold'
import CustomerTestimonials from '@/components/CustomerTestimonials'
import FAQSection from '@/components/FAQSection'
import DocumentsRequired from '@/components/DocumentsRequired'
import RequestCallback from '@/components/RequestCallback'
import HowItWorksPledge from '@/components/HowItWorksPledge'
import SellGoldComponent from '@/components/SellGoldComponent'
import PledgeGoldDes from '@/components/PledgeGoldDes'
import OldGoldCalculator from '@/components/OldGoldCalculator'
import PledgedGoldReleaseCalculator from '@/components/PledgedGoldReleaseCalculator'


export default function Home() {
  return (
    <>
     
      
      <HeroSection  />
     
        {/* <FixedActionBar /> */}
     
      <BestGoldByers/>
      <ValueGold/>
       
      <WhyChooseValueGold/>
      <CustomerTestimonials/>
      <FAQSection/>
      {/* <BranchFinder /> */}
    
     {/* <FaQs/> */}
     
      {/* <GoldInquiryForm/>
    
     
      
      
    
 
      <BranchFinder /> */}
     
    </>
  )
}
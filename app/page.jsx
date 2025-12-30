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


export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
      
      <HeroSection  />
      <div className="mt-8">
        <FixedActionBar />
      </div>
      <GoldInquiryForm/>
      <GoldValuationProcess/>
      <FaQs/>
      <FeaturesSection />
      <GoldRates />
      <Services />
      <BranchFinder />
      <Footer />
    </main>
  )
}
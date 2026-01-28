import HowItWorks from '@/components/HowItWorks'
import RequestCallback from '@/components/RequestCallback'
import SellGoldComponent from '@/components/SellGoldComponent'
import DocumentsRequired from '@/components/DocumentsRequired'
import GoldValuationProcess from '@/components/GoldValuationProcess'

export default function Home() {
  return (
    <> 
    <img
    src="/images/about_lg.jpg"
    alt="Happy Customer"
    className="w-full h-auto" // Adjust w-48 to your preferred size
  />
    <SellGoldComponent/>
<GoldValuationProcess/>
<DocumentsRequired pledge={false} />
<RequestCallback pledge={false}/>
    </>
  )
}
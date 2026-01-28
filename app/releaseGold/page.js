import HowItWorksPledge from '@/components/HowItWorksPledge'
import PledgeGoldDes from '@/components/PledgeGoldDes'
import DocumentsRequired from '@/components/DocumentsRequired'
import RequestCallback from '@/components/RequestCallback'

export default function Home() {
  return (
    <>
  <img
    src="/images/release_gold.jpeg"
    alt="Happy Customer"
    className="w-full h-auto" // Adjust w-48 to your preferred size
  />
<PledgeGoldDes/>
<HowItWorksPledge/>
<DocumentsRequired pledge={true} />
<RequestCallback pledge={true}/>
    </>
  )
}

import ValueVisionMission from '@/components/ValueVisionMission'
import OurLegacy from '@/components/OurLegacy'

export default function Home() {
  return (
    <>
    <img
    src="/images/about_img.jpeg"
    alt="Happy Customer"
    className="w-full h-auto" // Adjust w-48 to your preferred size
  />
    <OurLegacy/>
<ValueVisionMission/>
<h2 className='text-center text-lg font-bold text-blue-400 py-4'>CERTIFICATION AND OTHER CREDENTIALS</h2>
  <div className="flex justify-center mb-4">
  <img
    src="/images/iconCentron.png"
    alt="Happy Customer"
    className="w-120 h-auto" // Adjust w-48 to your preferred size
  />
</div>

    </>
  )
}
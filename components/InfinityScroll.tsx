import CircularGallery from './CircularGallery'

export default function InfinityScroll() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery 
        bend={1}
        textColor="#ffffff"
        bgColor="#120F17"
        borderRadius={0.05}
        scrollSpeed={2}
        scrollEase={0.05}
      />
    </div>
  )
}

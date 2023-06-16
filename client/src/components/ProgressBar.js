
function ProgressBar({progress}) {
//    const colors = ['rgb(255,214, 161)',
//    'rgb(255,214, 161)',
//    'rgb(255,214, 161)',
//    'rgb(255,214, 161)' 
//]
  console.log("progress", progress);
  
    return (
      <div className="outer-bar">
        <div className="inner-bar" 
        style={{width: `${progress}%`, backgroundColor : 'red'}}
        >

        </div>
      </div>
    );
  }
  
  export default ProgressBar;
  
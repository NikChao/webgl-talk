const COLORS = [
  /* Blue */
  '#1B58CE'

  /* Blue Light */
  ,'#D8E3FB'

  /* Blue Dark */
  ,'#00153D'

  /* Purple */
  ,'#C425C7'

  /* Purple Light */
  ,'#F5B4FF'

  /* Purple Dark */
  ,'#59005B'

  /* Red */
  ,'#E61C5D'

  /* Red Light */
  ,'#FCBFD3'

  /* Red Dark */
  ,'#7E000F'

  /* Yellow */
  ,'#FFE98A'

  /* Yellow Light */
  ,'#FEFBEF'

  /* Yellow Dark */
  ,'#E7BB01'
]

const getRandomColor = key => {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)];
  console.log(c);
  return c;
}

enum ActiveLib {
  PROJECT = 'project',
  CATEGORY = 'category',
}

export const ActiveLibToClassName: {[k in ActiveLib]: string} = {
  [ActiveLib.PROJECT]: 'Project',
  [ActiveLib.CATEGORY]: 'CategoryInfo'
}

export default ActiveLib;
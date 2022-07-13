export interface User{
    user_id: number,
    name: string,
    surname: string,
    birth_date: string,
    work_sheet: {
      monday: {
        first_shift: string,
        second_shift: string
      },
      tuesday: {
        first_shift: string,
        second_shift: string
      },
      wednesday: {
        first_shift: string,
        second_shift: string
      },
      thursday: {
        first_shift: string,
        second_shift: string
      },
      friday: {
        first_shift: string,
        second_shift: string
      }
    }
  }
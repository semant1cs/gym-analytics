export const initPanelModel = () => {
  const menuArray = [
    {
      label: 'Основные данные',
      items: [
        {
          title: 'Панель',
          caption: 'Главная страница',
          icon: 'mdi-home-outline',
          link: '/admin/',
          accessRights: [1]
        }
      ]
    },
    {
      label: 'Наполнение',
      items: [
        {
          title: 'Видео',
          caption: 'Добавьте видео для сотрудников',
          icon: 'mdi-book-open-outline',
          link: '/admin/videos/',
          accessRights: [1]
        },
        {
          title: 'Расписание',
          caption: 'Создайте/отредактируйте расписание по которому сотрудники будут выполнять гимнастику',
          icon: 'mdi-bookmark-outline',
          link: '/admin/schedule/',
          accessRights: [1]
        }
      ]
    },
    {
      label: 'Статистика',
      items: [
        {
          title: 'Видео',
          caption: 'Статистика по просмотренным видео',
          icon: 'mdi-account-hard-hat-outline',
          link: '/admin/stats/videos',
          accessRights: [1]
        },
        {
          title: 'Пользователи',
          caption: 'Статистика по пользователям и их активности',
          icon: 'mdi-account-hard-hat-outline',
          link: '/admin/stats/users',
          accessRights: [1]
        }
      ]
    },
  ]

  const filterMenuByAccessRights = (menu: typeof menuArray, userGroup: number) => {
    const newArr = []
    for (const group of menu) {
      const newGroup = {
        label: group.label,
        items: group.items.filter(item => item.accessRights.find(i => i !== userGroup))
      }
      if (newGroup.items.length > 0) { newArr.push(newGroup) }
    }

    return newArr
  }

  return {
    menuArray,
    filterMenuByAccessRights
  }
}

import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'
import PaperIcon from '@/components/icons/PaperIcon.vue'
import ReportIcon from '@/components/icons/ReportIcon'
import TagpriceIcon from '@/components/icons/TagpriceIcon.vue'
import ThumbsUpIcon from '@/components/icons/ThumbsUpIcon.vue'
import WifiIcon from '@/components/icons/WifiIcon.vue'
import WrenchIcon from '@/components/icons/WrenchIcon.vue'

export default {
  /**
   * Custom icons
   * <v-icon>$vuetify.icons.dashboard</v-icon>
   */
  icons: {
    values: {
      chevronDown: {
        component: ChevronDownIcon
      },
      chevronLeft: {
        component: ChevronLeftIcon
      },
      chevronRight: {
        component: ChevronRightIcon
      },
      clock: {
        component: ClockIcon
      },
      edit: {
        component: EditIcon
      },
      globe: {
        component: GlobeIcon
      },
      paper: {
        component: PaperIcon
      },
      report: {
        component: ReportIcon
      },
      tagprice: {
        component: TagpriceIcon
      },
      thumbsUp: {
        component: ThumbsUpIcon
      },
      wifi: {
        component: WifiIcon
      },
      wrench: {
        component: WrenchIcon
      }
    }
  },

  theme: {
    themes: {
      light: {
        primary: '#007675',
        secondary: '#5A489B',
        error: '#FA4856',
        warning: '#FFD20C',
        success: '#72D62A'
      }
    }
  }
}

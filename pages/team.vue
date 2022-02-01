<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-row :class="$vuetify.breakpoint.xs ? 'pa-5' : 'pa-10'">
        <v-col cols="auto" lg="4">
          <h1 class="text-h4">Our Team</h1>
          <p class="mt-2">
            Our team's goal is empowering cryptocurrency enthusiasts and traders for success. We know from our own
            trading experiences that the crypto market is fast moving which demands reliable data and tools. Our
            platforms provide content-rich resources that inform, track, and simplify the trading process with superior
            visuals displays. While each member has a varied skill set, we collaborate to offer a fast platform with
            advanced interactive features. We are a new site in active development, so we encourage feedback from users
            regarding features they desire.
          </p>
        </v-col>
        <v-col cols="auto" lg="8">
          <v-row class="my-5">
            <v-col v-for="member in team" :key="member._id" cols="auto" lg="6" md="6" sm="12" width="200">
              <BioDialog
                :is-visibility="member.bioIsVisible"
                :name="member.name"
                :job-title="member.jobTitle"
                :bio="member.bio"
                :thumbnail-url="member.thumbnailUrl"
                :socials="member.socials"
                @close-dialog="closeBio"
              >
              </BioDialog>
              <div class="d-flex justify-left">
                <v-avatar :size="$vuetify.breakpoint.xs ? 65 : 80" :class="$vuetify.breakpoint.xs ? '' : 'ml-5'">
                  <img
                    class="rounded-circle"
                    :src="require(`~/assets/images/team/${member.thumbnailUrl}.jpg`)"
                    alt="avatar"
                  />
                </v-avatar>

                <div class="ml-6 mt-2">
                  <h4 class="text-h6 v-clickable" @click="openBio(member._id)">
                    {{ member.name }}
                  </h4>
                  <p class="text--secondary">
                    {{ member.jobTitle }}
                  </p>

                  <a v-for="social in member.socials" :key="social.social" :href="social.link" target="_blank">
                    <v-icon class="mt-n7 mr-3" size="20">mdi-{{ social.icon }}</v-icon>
                  </a>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row :class="$vuetify.breakpoint.xs ? 'pa-5' : 'pa-10'">
        <v-col cols="auto" lg="4" align="left">
          <h1 class="text-h4">Our Advisors</h1>
          <p class="mt-2">
            Our Advisors are some of the top performers to work and interface with financial trading systems. All have
            been significant contributors at the New York Stock Exchange, they fully understand how trading systems work
            and the features traders expect.
          </p>
        </v-col>
        <v-col cols="12" lg="8">
          <v-row class="my-5">
            <v-col v-for="advisor in advisors" :key="advisor.id" cols="auto" lg="6" md="6" sm="12" width="200">
              <BioDialog
                :is-visibility="advisor.bioIsVisible"
                :name="advisor.name"
                :job-title="advisor.jobTitle"
                :bio="advisor.bio"
                :thumbnail-url="advisor.thumbnailUrl"
                :socials="advisor.socials"
                @close-dialog="closeAdvisorBio"
              ></BioDialog>
              <div class="d-flex justify-left">
                <v-avatar :size="$vuetify.breakpoint.xs ? 65 : 80" :class="$vuetify.breakpoint.xs ? '' : 'ml-5'">
                  <img
                    class="rounded-circle"
                    :src="require(`~/assets/images/team/${advisor.thumbnailUrl}.jpg`)"
                    alt="avatar"
                  />
                </v-avatar>

                <div class="ml-6 mt-2">
                  <h4 class="text-h6 v-clickable" @click="openAdvisorBio(advisor._id)">
                    {{ advisor.name }}
                  </h4>
                  <p class="text--secondary">{{ advisor.jobTitle }}</p>

                  <a v-for="social in advisor.socials" :key="social.social" :href="social.link" target="_blank">
                    <v-icon class="mt-n7 mr-3" size="20">mdi-{{ social.icon }}</v-icon>
                  </a>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

interface Team {
  _id: number
  name: string
  jobTitle: string
  thumbnailUrl: string
  bioIsVisible: boolean
  socials: Array<object>
  bio: string
}

@Component({
  name: 'Team',
  transition: 'slide-x-transition',
  components: {
    BioDialog: () => import('@/components/BioDialog.vue'),
  },

  head(): object {
    return {
      title: 'Meet Our Team and Advisors | DeFi Heatmap',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'The cryptocurrency team working to improve the crypto modal experience',
        },
        // Open Graph
        {
          name: 'og:title',
          content: 'Our Team and Advisors | DeFi Heatmap',
        },
        {
          name: 'og:description',
          content: 'The cryptocurrency team working to improve the crypto modal experience',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: process.env.BASE_URL },
        {
          name: 'og:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/DeFiHeatmapHomepage.jpg',
        },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Quantify_Crypto' },
        {
          name: 'twitter:title',
          content: 'Our Team and Advisors | DeFi Heatmap',
        },
        {
          name: 'twitter:description',
          content: 'The cryptocurrency team working to improve the crypto modal experience',
        },
        {
          name: 'twitter:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/DeFiHeatmapHomepage.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'The cryptocurrency team working to improve the crypto modal experience',
        },
      ],
    }
  },
})
export default class OurTeam extends Vue {
  openBio(memberId: number): void {
    for (const member of this.team) {
      if (member._id === memberId) {
        member.bioIsVisible = true
      }
    }
  }

  closeBio(teamMember: string): void {
    for (const member of this.team) {
      if (member.thumbnailUrl === teamMember) {
        member.bioIsVisible = false
      }
    }
  }

  openAdvisorBio(advisorId: number): void {
    for (const advisor of this.advisors) {
      if (advisor._id === advisorId) {
        advisor.bioIsVisible = true
      }
    }
  }

  closeAdvisorBio(advisorName: string): void {
    for (const advisor of this.advisors) {
      if (advisor.thumbnailUrl === advisorName) {
        advisor.bioIsVisible = false
      }
    }
  }

  private team: Array<Team> = [
    {
      _id: 1,
      name: 'John Barry',
      jobTitle: 'CEO / Co-Founder',
      thumbnailUrl: 'john',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/johnbarryit/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/Quantify_Crypto',
        },
      ],
      bio:
        'John is an Information Technology developer with over 30 years of executive experience in financial services, including 23 years at the New York Stock Exchange. He flourished as lead developer for the vital SuperDot order flow system that tracked every order entering the NYSE computer systems. Later, John was responsible for the Capacity Planning of all NYSE order flow system, earning the Chairman’s Award for his project management success. As the CEO of Quantify Crypto, John combines his deep understanding of the securities industry and project leadership expertise to form the company vision.',
    },
    {
      _id: 2,
      name: 'Alexander Barry',
      jobTitle: 'CTO / Co-Founder',
      thumbnailUrl: 'alex',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/alexander-barry-56bb13119/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/Alexclarkbarry',
        },
      ],
      bio:
        'Alex bought his first Bitcoins in 2016 while in college studying information security as a Computer Science major. Since then, he immersed himself in everything crypto and is an accomplished developer of automated modal bots. Shortly after making his first trades on Uniswap during the DeFi Summer of 2020, he dove headfirst into programming for Ethereum and is the driving force behind integrating Ethereum based products into our platform.',
    },
    {
      _id: 3,
      name: 'Maksym "Max" Zhakun',
      jobTitle: 'Web Engineer',
      thumbnailUrl: 'maksym',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/maksym-zhakun-938362a2/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/maxzhakun',
        },
      ],
      bio:
        'Max is a brilliant developer with complete usage of latest software components and tools.  He is lead system architect of the Quantify Crypto platform, deciding the necessary technology and techniques the system requires.  His full knowledge of databases, AWS servers, networking, programming languages, communication protocols and standards is demonstrated on our platform.',
    },
    {
      _id: 4,
      name: 'Irene Aguas',
      jobTitle: 'Software Developer',
      thumbnailUrl: 'irene',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/ireneaguas/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/hay_rheen',
        },
      ],
      bio:
        "Irene's career in Programming started in 2017 for a healthcare company in California. Her immense love for technology and software applications made her change profession from being a Nurse to a full time Software Developer. Irene has quickly learned the most advanced concepts of front-end web site design while using her creative skills to ensure that our platform exceeds the industry standards. She is a strong contributor to our web site development team.",
    },
    {
      _id: 5,
      name: 'Annalese a.k.a "Bitcoin Queen"',
      jobTitle: 'Head of Business Development',
      thumbnailUrl: 'annalese',
      bioIsVisible: false,
      socials: [
        {
          icon: 'twitter',
          link: 'https://twitter.com/TheBTCQueen',
        },
      ],
      bio:
        'Annalese- otherwise known as "Bitcoin Queen" is a crypto community advocate for the city of Miami. She has a BA in business administration with a minor in health administration and communications. Annalese came across bitcoin for the first time in 2017 through a mutual friend, who later became her business partner in building a local media company with a blockchain focus. She has worked closely with both local and national organizations curating conferences and events. Aside from crypto, she enjoys spending time with her trusty companion- Trunks the pitbull',
    },
    {
      _id: 6,
      name: 'Joseph Nisivoccia',
      jobTitle: 'Customer Outreach and Sales',
      thumbnailUrl: 'joseph',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/joe-nisivoccia-a76859ab/',
        },
      ],
      bio:
        'Hey there, my name is Joe Nisivoccia. My professional background has been in B2B and B2C sales for the past 4 years for some of the most innovative, disruptive software and financial services companies in the US. As a member of the 2020 Scotsman’s Guide, I was ranked within the top 500 individual mortgage loan originators with Better Mortgage - recently voted LinkedIn’s #1 Startup of 2020! In my spare time, I’m an avid sports fan (NFL, MLB and NBA) and enjoy spending time outdoors. I plan on providing Quantify Crypto’s potential clients and investors a level of customer care and market & product insight second to none in the emerging digital asset space.',
    },
    {
      _id: 7,
      name: 'Angela Barry',
      jobTitle: 'Manager',
      thumbnailUrl: 'angela',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/angela-barry-638a2a155/',
        },
      ],
      bio:
        'With a Master of Science in Digital Currency, she’s an expert on the workings of blockchain technology and tracks its regulatory framework. Angela has a bachelor’s degree in economics bringing over 15 years of research talent and supports our team with a diverse skillset.',
    },
  ]

  private advisors: Array<Team> = [
    {
      _id: 1,
      name: 'Paul Bauccio',
      jobTitle: 'Advisor',
      thumbnailUrl: 'paul',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/paulbauccio/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/PaulBauccio',
        },
      ],
      bio:
        'Paul currently serves as Chief Risk Officer of IEX Group, Inc. (a successful startup founded in 2012) parent company of Investors Exchange, IEX Cloud, and IEX Astral. Paul joined IEX in 2015 after 15 years at the New York Stock Exchange where he was Senior Vice President of Market Operations. Paul was responsible for overseeing daily operations of the NYSE Trading Floor and cash equity business. With over 20 years of leadership experience, Paul has been at the forefront of industry shaping initiatives and innovative technology projects.',
    },
    {
      _id: 2,
      name: 'Jerry Raio',
      jobTitle: 'Advisor',
      thumbnailUrl: 'jerry',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/jerry-raio-5556a814/',
        },
      ],
      bio: `<div>Jerry is the Founder, President and CEO of Arbor Lane Advisors, Inc., a financial services consulting firm with expertise in product development, product management, marketing, and distribution of investment products. His career on Wall Street spans over 30 years, mostly focused on the distribution of new issue Equity Capital Markets product to Financial Advisors and retail investors. Jerry was Head of Retail Origination at Wells Fargo Securities where he worked closely with asset management clients to structure, market and execute new closed end fund offerings. Jerry also had significant roles at Wachovia (now Wells Fargo), Morgan Stanley and Citigroup.  He serves on the board/advisory board of several firms including RiverNorth Capital Management closed-end funds, FLX Distribution and Qudos Technologies. </div>
        <div class='mt-3'>Jerry holds multiple FINRA licenses including the following: Series 7 (General Securities Representative), 24 (General Principal) and 79 (Investment Banking Representative)</div>`,
    },
    {
      _id: 3,
      name: 'Warren Rosenbaum',
      jobTitle: 'Advisor',
      thumbnailUrl: 'warren',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/warrenrosenbaum/',
        },
      ],
      bio:
        'Warren was the chief architect of the Technology and Operations divisions of the New York Stock Exchange. A senior Vice President leader with full responsibility for the software and hardware architecture of the NYSE enterprise systems.  Warren provided the vision and innovation guidance keeping NYSE as a technology leader. During his tenure, over 25+ years, the NYSE systems consistently had operational uptimes of over 99.99% due to his successful.',
    },
    {
      _id: 4,
      name: 'Harold Bott',
      jobTitle: 'Advisor',
      thumbnailUrl: 'harold',
      bioIsVisible: false,
      socials: [
        {
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/haroldbott/',
        },
        {
          icon: 'twitter',
          link: 'https://twitter.com/haroldbott',
        },
      ],
      bio:
        "Harold’s career started in 1993 at Goldman Sachs while a graduate student at the Columbia University School of Engineering and Applied Science. At Goldman, he worked with the government bond and repo desks to develop modal platforms. He was an angel investor in a Goldman colleague's startup, eGain Communications, now a public company. As Chief Information Officer at specialist firm Bear Wagner, lead the development of electronic modal for NYSE and ARCA equities. Promoted by JP Morgan (after acquiring Bear Wagner) to Executive Director before leaving to serve as a consultant for high frequency modal firms, including Getco. Harold received his BA in Music cum laude and throughout his career has worked as a professional musician.",
    },
  ]
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.v-clickable {
  cursor: pointer;
}
</style>

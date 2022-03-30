import { useQuery } from '@vue/apollo-composable/dist'
import { GlobalStatsQueryGQL } from '~/apollo/main/config.query.graphql'
export default function () {
  const { result, loading, error } = useQuery(GlobalStatsQueryGQL)
  console.log(result, loading, error)
  // const users = useResult(result, null, (data) => data.data)
  // console.log(users)
  const data = 'some datahere'
  return { data }
}

import { useCourseModule } from "@/hooks/courses"

type Props = {
  courseId: string
  groupid: string
}

const CourseModuleList = ({ courseId, groupid }: Props) => {
  const {
    data,
    onEditModule,
    edit,
    triggerRef,
    inputRef,
    variables,
    pathname,
    isPending,
    groupOwner,
    sectionVariables,
    pendingSection,
    mutateSection,
    setActiveSection,
    activeSection,
    contentRef,
    onEditSection,
    editSection,
    sectionInputRef,
    sectionUpdatePending,
    updateVariables,
  } = useCourseModule(courseId, groupid)
  return <div>CourseModuleList</div>
}

export default CourseModuleList

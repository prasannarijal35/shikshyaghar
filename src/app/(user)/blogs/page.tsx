    import { AllBlogs } from "@/components/blogs";
import Breadcrumb from "@/components/common/BreadCrumb"; 
    export default function Page() {
      return (
        <>
    <Breadcrumb title={"Blogs"} subTitle="blogs" subTitleLink="/blogs" />
          <AllBlogs />
        </>
      );
    }
    
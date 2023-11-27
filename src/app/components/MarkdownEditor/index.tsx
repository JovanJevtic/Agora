import MDEditor from '@uiw/react-md-editor';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { ControllerRenderProps } from 'react-hook-form';

type Props = {
    // field: ControllerRenderProps<{ image: string, fotoIzvor: string, body: string, title: string, subtitle: string, slug: string, subcategoryId: string, categoryId: string, positionPrimary: boolean, positionSecondary: boolean}, "body">
    onChange: (...event: any[]) => void
    value: string;
}   

const MdEditor: React.FunctionComponent<Props> = ({ onChange, value }) => {
    // const [value, setValue] = useState<string | undefined>("**Ovdje pisi!!!**");
    const { setTheme, theme } = useTheme()

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !theme) return <>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full"  />
    </>

    return (
       <>
        <MDEditor
                value={value}
                // defaultValue={"Pisi ovdje"}
                onChange={onChange}
                // commands={[]}
                extraCommands={[]}
                preview='edit'
                data-color-mode={theme === 'dark' ? 'dark' : 'light'}
                // style={{ background: '#000' }}
                className='focus-visible:border-zinc-400 focus-visible:dark:border-zinc-600 focus-visible:border-1 bg-secondary dark:bg-background'
            />
            <MDEditor.Markdown 
                data-color-mode={theme === 'dark' ? 'dark' : 'light'}
                source={value} 
                style={{ whiteSpace: 'pre-wrap', borderColor: '#333' }} 
                className='border-zinc-400 dark:border-zinc-600 border-[1px] bg-solid dark:bg-background p-3 mt-5 rounded-[5px]'
            />
        </>
  )
}

export default MdEditor
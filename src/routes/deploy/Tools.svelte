<script>
  import { Input, Button, Toolbar, ToolbarButton } from 'flowbite-svelte';
  import { CogSolid, DotsVerticalOutline, DownloadSolid } from 'flowbite-svelte-icons';
  import { ExclamationCircleSolid, PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
</script>
<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-300">
    <Input placeholder="Search for users" class="me-4 w-80 border xl:w-96" />
    <div class="border-l border-gray-100 pl-2 dark:border-gray-700">
      <ToolbarButton color="dark" class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700">
        <CogSolid size="lg" />
      </ToolbarButton>
      <ToolbarButton color="dark" class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700">
        <TrashBinSolid size="lg" />
      </ToolbarButton>
      <ToolbarButton color="dark" class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700">
        <ExclamationCircleSolid size="lg" />
      </ToolbarButton>
      <ToolbarButton color="dark" class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700">
        <DotsVerticalOutline size="lg" />
      </ToolbarButton>
    </div>
    {#snippet end()}
      <div class="flex items-center space-x-2">
        <Button size="sm" class="gap-2 px-3 whitespace-nowrap">
          <PlusOutline size="sm" />Add user
        </Button>
        <Button size="sm" color="alternative" class="gap-2 px-3">
          <DownloadSolid size="md" class="-ml-1" />Export
        </Button>
      </div>
    {/snippet}
  </Toolbar>